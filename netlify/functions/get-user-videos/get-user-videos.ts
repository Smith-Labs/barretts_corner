import { Handler } from '@netlify/functions'
import axios from 'axios'

export const handler: Handler = async (event, context) => {
  const params = event.queryStringParameters

  try {

    const response = await axios.get(`https://api.twitch.tv/helix/videos?user_id=${params?.user_id}`,
      {
        headers: {
          'Authorization': `Bearer ${params?.token}`,
          'Client-Id': process.env.CLIENT_ID
        }
      })

      // console.log(response.data.data)

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    }
  } catch (error) {
    return {
        statusCode: 500,
        body: JSON.stringify({ error: error })
    };
  }
}
