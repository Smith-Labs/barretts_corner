import { Handler } from '@netlify/functions'
import axios from 'axios'

export const handler: Handler = async (event, context) => {
  
  const params = event.queryStringParameters

  try {

    const response = await axios.get('https://api.twitch.tv/helix/users?login=barrett_ok',
      {
        headers: {
          'Authorization': `Bearer ${params?.token}`,
          'Client-Id': process.env.CLIENT_ID
        }
      })

      // console.log(response.data.data[0])

    return {
      statusCode: 200,
      body: JSON.stringify(response.data.data[0]),
    }
  } catch (error) {
    return {
        statusCode: 500,
        body: JSON.stringify({ error: error })
    };
  }
}
