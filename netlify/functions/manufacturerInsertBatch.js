"use strict"

const clientPromise = require('./mongoDB');
const headers = require('./headersCORS');

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }
  
  try {
	const client = await clientPromise;
	const data = JSON.parse(event.body);
	data._id = parseInt(data._id)
    console.log(event.body)

	await client.db("supercars").collection("manufacturers").insertOne(data);

    return { statusCode: 200, headers, body: 'OK'};
  } catch (error) {
    console.log(error);
    return { statusCode: 422, headers, body: JSON.stringify(error) };
  }
};