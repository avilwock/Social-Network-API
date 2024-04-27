# Social-Network-API

## Description

This project is to create a social network backend using MongoDB. The purpose of this social network application is so that users can share their thoughts, react to friend's thoughts, and create a friend list.

The software for routing will be express.js. The database data will be structured with MongoDB. An optional date library can also be used.

## User Story

As A social medial startup
I WANT an API for my social network that uses a noSQL database
SO THAT my website can handle large amounts of unstructured data.

## Acceptance Criteria

GIVEN a social network API
WHEN I enter a command to invoke the aplication
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open the API GET routes in Insomnia fo rusers and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST PUT and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions and thoughts and add and remove friends to a user's friend list