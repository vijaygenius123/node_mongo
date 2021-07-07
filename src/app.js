require('dotenv').config()
const {MongoClient} = require('mongodb')


async function main(){
    const client = MongoClient(process.env.MONGO_URI)

    try{
        await client.connect()
        await listDatabases(client)
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

main().catch(e => console.error(e))
