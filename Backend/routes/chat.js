// routes/chat.js

const express = require("express");
const axios = require("axios");

const router = express.Router();


// Get IBM IAM Access Token
async function getIAMToken() {

    try {

        const response = await axios.post(
            "https://iam.cloud.ibm.com/identity/token",
            new URLSearchParams({
                grant_type: "urn:ibm:params:oauth:grant-type:apikey",
                apikey: process.env.IBM_API_KEY
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        );


        return response.data.access_token;


    } catch(error) {

        console.log(
            "IBM Token Error:",
            error.response?.data || error.message
        );

        throw new Error("Unable to generate IBM authentication token");
    }
}



// Chat endpoint

router.post("/", async(req,res)=>{


    try {


        const userMessage = req.body.message;


        if(!userMessage){

            return res.status(400).json({
                error:"Message is required"
            });

        }



        // Generate IBM token

        const token = await getIAMToken();



        // Call watsonx Orchestrate Agent

        const response = await axios.post(

            `${process.env.IBM_HOST_URL}/api/v1/orchestrate/agents/${process.env.AGENT_ID}/chat`,

            {
                message:userMessage
            },

            {

                headers:{

                    "Authorization":`Bearer ${token}`,

                    "Content-Type":"application/json"

                }

            }

        );



        res.json({

            reply:
            response.data.output ||
            response.data.message ||
            response.data

        });



    }

    catch(error){


        console.log(
            "Agent Error:",
            error.response?.data || error.message
        );


        res.status(500).json({

            error:"Failed to connect with IBM watsonx Orchestrate"

        });


    }


});


module.exports = router;