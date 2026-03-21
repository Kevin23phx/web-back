"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../src/app.module");
const reports_service_1 = require("../src/reports/reports.service");
const mongoose_1 = require("@nestjs/mongoose");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const reportsService = app.get(reports_service_1.ReportsService);
    const reportModel = app.get((0, mongoose_1.getModelToken)('Report'));
    console.log('--- Starting Image Migration ---');
    const reports = await reportModel.find({
        images: { $regex: /^data:image/ }
    });
    console.log(`Found ${reports.length} reports with Base64 images.`);
    for (const report of reports) {
        console.log(`Migrating report: ${report._id} (${report.title})`);
        const newImageUrls = [];
        let updated = false;
        for (const img of report.images) {
            if (img.startsWith('data:image')) {
                try {
                    const upload = await reportsService.cloudinaryService.uploadBase64(img);
                    if (upload.url || upload.secure_url) {
                        newImageUrls.push(upload.secure_url || upload.url);
                        updated = true;
                    }
                    else {
                        newImageUrls.push(img);
                    }
                }
                catch (error) {
                    console.error(`Failed to upload image for report ${report._id}:`, error.message);
                    newImageUrls.push(img);
                }
            }
            else {
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
//# sourceMappingURL=migrate-images.js.map