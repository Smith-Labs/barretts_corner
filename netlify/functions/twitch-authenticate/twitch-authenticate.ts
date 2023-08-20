import { Handler } from '@netlify/functions'
import axios from 'axios';

export const handler: Handler = async (event, context) => {
  
  const requestBody = {
    'client_id': process.env.CLIENT_ID,
    'client_secret': process.env.CLIENT_SECRET,
    'grant_type': 'client_credentials'
  };

  try {
      const response = await axios.post('https://id.twitch.tv/oauth2/token', requestBody);
      
      // console.log(response.data);

      return {
        statusCode: 200,
        body: JSON.stringify(response.data)
      }
  }  catch (error) {
    return {
        statusCode: 500,
        body: JSON.stringify({ error: error })
    };
  }
}