import * as express from 'express'
import upload from '../controllers/upload'

const router = express.Router();


router.get('/hello', function (req: any, res: any) {
  res.send('hello1')
});

router.post('/upload', upload);


export default router