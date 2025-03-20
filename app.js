import { fileURLToPath } from 'url';
import path from 'node:path';
import { resolve } from 'node:path';

export function serveStatic(app, express){

    if(process.env.NODE_ENV=="production"){

        const filename = fileURLToPath(import.meta.url)
    
        const dirname = path.dirname(filename)
    
        //app.use('/', express.static('dist'));
    
        console.log('directory path :',dirname)
        
        app.get("/*", (req, res) => {
            res.sendFile(resolve("index.html"))
        })
    }
}