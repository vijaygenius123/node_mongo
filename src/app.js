require('dotenv').config()
const {MongoClient} = require('mongodb')


async function main(){
    const client = MongoClient(process.env.MONGO_URI)

    try{
        await client.connect()
        // await listDatabases(client)
        await createListing(client, {
            name: "Lovely Loft",
            summary: "A charming loft in Paris",
            bedrooms: 1,
            bathrooms: 1
        })
    }catch (err){
        console.error(err)
    } finally {
        await client.close()
    }
}

async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases()
    databasesList.databases.forEach(db => console.log(db))
}

async function createListing(client, newListing){
    const result = await client.db("sample_airbnb").collection("listingAndReviews").insertOne(newListing)
    console.log(`New listing created with ${result.insertedId}`)
}

main().catch(e => console.error(e))
