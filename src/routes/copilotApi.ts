import express, { type Request, type Response, Router } from 'express';
import { addMessageToThread } from '../modules/cockpitCopilot';

const router: Router = Router();

router.use(express.json());

// send message to the assistant
router.post('/add-message', (req: Request, res: Response) => {
  void (async () => {
    try {
      const response = await addMessageToThread(req.body.content, req.body.instructions);
      res.send(response);
    } catch (error) {
      res.status(500).send(error);
    }
  })();
});

export default router;
