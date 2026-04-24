import { scaffold } from '../src/utils/scaffold.js';
import path from 'path';

const targetDir = path.join(process.cwd(), 'test-gold-manual-4');

async function test() {
    try {
        await scaffold(targetDir, {
            projectName: 'test-gold-manual-4',
            language: 'js',
            projectType: 'ejs',
            features: ['auth'],
            git: false
        });
        console.log("SUCCESS");
    } catch (e) {
        console.error("FAILED", e);
    }
}

test();
