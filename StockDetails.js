const {MongoClient} = require('mongodb');

const CONF = require('./mongoconf.json');
const res = require('express/lib/response');

class StockDetails{
    
    async getStockDetails(symbol){
        const client = new MongoClient(CONF.url);
        try{
            console.log("URL :"+CONF.url)            
            await client.connect();
            const result = await client.db(CONF.dbName).collection("stock_details").find({"nsecode":symbol}).toArray();            
            console.log(JSON.stringify(result));
            return result;
        }catch(e){
            console.log(e);
        }finally{
            await client.close();
        }        
    }

    async getStockPriceDetails(symbol){
        const client = new MongoClient(CONF.url);
        try{
            console.log("URL :"+CONF.url)            
            await client.connect();
            const result = await client.db(CONF.dbName).collection("stock_tradinginfo").find({"symbol":symbol}).toArray();            
            console.log(JSON.stringify(result));
            return result;
        }catch(e){
            console.log(e);
        }finally{
            await client.close();
        }        
    }

    async getStockResultDetails(symbol){
        const client = new MongoClient(CONF.url);
        try{
            console.log("URL :"+CONF.url)            
            await client.connect();
            const result = await client.db(CONF.dbName).collection("stock_results").find({"symbol":symbol}).toArray();            
            console.log(JSON.stringify(result));
            return result;
        }catch(e){
            console.log(e);
        }finally{
            await client.close();
        }        
    }

    async getStockCorpActions(symbol){
        const client = new MongoClient(CONF.url);
        try{
            console.log("URL :"+CONF.url)            
            await client.connect();
            const result = await client.db(CONF.dbName).collection("stock_corp_action").find({"symbol":symbol}).toArray();            
            console.log(JSON.stringify(result));
            return result;
        }catch(e){
            console.log(e);
        }finally{
            await client.close();
        }        
    }

    async getStockHistPrices(symbol){
        const client = new MongoClient(CONF.url);
        try{
            console.log("URL :"+CONF.url)            
            await client.connect();
            const result = await client.db(CONF.dbName).collection("stock_hist_prices").find({"symbol":symbol}).toArray();            
            console.log(JSON.stringify(result));
            return result;
        }catch(e){
            console.log(e);
        }finally{
            await client.close();
        }        
    }

    async getPeersList(industry){
        const client = new MongoClient(CONF.url);
        try{
            console.log("URL :"+CONF.url)            
            await client.connect();            
            const result = await client.db(CONF.dbName).collection("stock_tradinginfo").find({"sector":industry}).toArray();            
            console.log(JSON.stringify(result));
            return result;
        }catch(e){
            console.log(e);
        }finally{
            await client.close();
        }        
    }

    async getTopScoreList(){
        const client = new MongoClient(CONF.url);
        try{
            console.log("URL :"+CONF.url)            
            await client.connect();
            var condition = {"finance_grade":{"$in":["positive","very positive","flat"]},"valuation_grade":{"$in":["average","good"]}}
            const result = await client.db(CONF.dbName).collection("stock_score").find(condition).toArray();            
            console.log(JSON.stringify(result));
            return result;
        }catch(e){
            console.log(e);
        }finally{
            await client.close();
        }        
    }

    async getStockScore(symbol){
        const client = new MongoClient(CONF.url);
        try{
            console.log("URL :"+CONF.url)            
            await client.connect();
            const result = await client.db(CONF.dbName).collection("stock_score").find({"symbol":symbol}).sort({"date":-1,"total_point": -1}).toArray();            
            console.log(JSON.stringify(result));
            return result;
        }catch(e){
            console.log(e);
        }finally{
            await client.close();
        }        
    }
}

module.exports = StockDetails