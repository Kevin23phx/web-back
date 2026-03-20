import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ReportsService } from '../src/reports/reports.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReportDocument } from '../src/reports/schemas/report.schema';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const reportsService = app.get(ReportsService);
  const reportModel = app.get<Model<ReportDocument>>(getModelToken('Report'));

  console.log('--- Starting Image Migration ---');

  const reports = await reportModel.find({
    images: { $regex: /^data:image/ }
  });

  console.log(`Found ${reports.length} reports with Base64 images.`);

  for (const report of reports) {
    console.log(`Migrating report: ${report._id} (${report.title})`);
    const newImageUrls: string[] = [];
    let updated = false;

    for (const img of report.images) {
      if (img.startsWith('data:image')) {
        try {
          // Temporarily use the service logic to upload
          // Note: Ensure Cloudinary is configured in .env
          const upload = await (reportsService as any).cloudinaryService.uploadBase64(img);
          if (upload.url || upload.secure_url) {
            newImageUrls.push(upload.secure_url || upload.url);
            updated = true;
          } else {
            newImageUrls.push(img); // Keep original if upload failed but returned no URL
          }
        } catch (error) {
          console.error(`Failed to upload image for report ${report._id}:`, error.message);
          newImageUrls.push(img);
        }
      } else {
        newImageUrls.push(img);
      }
    }

    if (updated) {
      report.images = newImageUrls;
      await report.save();
      console.log(`Successfully migrated report ${report._id}`);
    }
  }

  console.log('--- Migration Finished ---');
  await app.close();
}

bootstrap().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
