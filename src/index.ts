import app from './app';
import { iinitializeAssistant } from './modules/cockpitCopilot';

const port = (process.env.PORT != null) || 8080;

app.listen(port, () => {
  console.log(`coder copilot application is running on port ${port}.✅`);
  iinitializeAssistant()
    .then(() => {
      console.log('assistant started');
    })
    .catch((error: any) => {
      console.error('assistant start failed:', error.code);
    });
});
