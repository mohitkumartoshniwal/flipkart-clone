import paytmchecksum from '../paytm/PaytmChecksum.js';
import { paytmParams, paytmMerchantkey } from '../server.js';
import formidable from 'formidable';
import https from 'https';

export const addPaymentGateway = async (request, response) => {
    paytmParams['TXN_AMOUNT'] = request.body.amount ? request.body.amount + '' : '1000'
    paytmParams['EMAIL'] = request.body.email ? request.body.email : paytmParams['EMAIL']
    let paytmCheckSum = await paytmchecksum.generateSignature(paytmParams, paytmMerchantkey);
    try {
        let params = {
            ...paytmParams,
            'CHECKSUMHASH': paytmCheckSum
        };
        response.json(params);
    } catch (error) {
        console.log(error);
    }
}

export const paymentResponse = (request, response) => {

    const form = new formidable.IncomingForm();
    let paytmCheckSum = request.body.CHECKSUMHASH;
    delete request.body.CHECKSUMHASH;

    var isVerifySignature = paytmchecksum.verifySignature(request.body, 'bKMfNxPPf_QdZppa', paytmCheckSum);
    console.log(isVerifySignature);
    if (isVerifySignature) {
        var paytmParams = {};
        paytmParams["MID"] = request.body.MID;
        paytmParams["ORDERID"] = request.body.ORDERID;

        paytmchecksum.generateSignature(paytmParams, 'bKMfNxPPf_QdZppa').then(function (checksum) {

            paytmParams["CHECKSUMHASH"] = checksum;

            var post_data = JSON.stringify(paytmParams);

            var options = {

                hostname: 'securegw-stage.paytm.in',
                port: 443,
                path: '/order/status',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': post_data.length
                }
            };

            var res = "";
            var post_req = https.request(options, function (post_res) {
                post_res.on('data', function (chunk) {
                    res += chunk;
                });

                post_res.on('end', function () {
                    let result = JSON.parse(res)
                    response.redirect("/")
                });
            });
            post_req.write(post_data);
            post_req.end();
        });
    } else {
        console.log("Checksum Mismatched");
    }
    console.log('//////////////end')
}
