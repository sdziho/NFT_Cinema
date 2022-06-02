const { assert } = require('chai');

const Kino=artifacts.require('./Token.sol');
require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Token',(accounts)=>{
    let contract;
    before(async()=>{
        contract=await Kino.deployed();
    })
    describe('deployment', async()=>{
        it('deploys successfully', async()=>{
            const address =contract.address;
            assert.notEqual(address,'');
            assert.notEqual(address,0x00);
            assert.notEqual(address,null);
            assert.notEqual(address,undefined);
        })
        it('ime uredu', async()=>{
            const ime=contract.name;
            console.log(ime);
           // assert.equal(ime,"Cinema Movie Token");
        })
    })

    describe('minting', async()=>{
        it('deploys successfully', async()=>{
            const result=await contract.mint("Kad jaganjci utihnu",14);
            const totSupply=await contract.totalSupply();
            assert.equal(totSupply,1)
            const event=result.logs[0].args
            assert.equal(event.tokenId.toNumber(),14, 'ID')
            assert.equal(event.to,accounts[0], 'to')


            //duplo
            await contract.mint("Kad jaganjci utihnu",14).should.be.rejected;
        })
    })

    describe('listing', async()=>{
        it('deploys successfully', async()=>{
            await contract.mint("Inception",11);
            await contract.mint("Pulp fiction",7);
            const tot=await contract.totalSupply();
            let film;
            for(var i=0;i<tot;i++){
                film=await contract.karte(i);
                console.log(film.ime);
                console.log(film.sjediste.toNumber())
            }
        })
    })

})