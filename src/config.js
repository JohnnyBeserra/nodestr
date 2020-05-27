global.SALT_KEY = 'f5b99242-4ca3-90f2-05e78e5761ef';
global.EMAIL_TMPL = '<strong>{0}</strong>'

module.exports = {
    connectionString: 'mongodb+srv://johnnybs:johnnybs@cluster0-x4mtm.mongodb.net/test?retryWrites=true&w=majority',
    sendgridkey: '7c670ba4c1e0b1d8a6ab866456540961',//Chave para enviar email
    //chave para armazenar as imagens do produto do azure
    containerConnectionString: 'DefaultEndpointsProtocol=https;AccountName=nodestrs;AccountKey=VBoCF0x9AkQxj+58WHH1qHYMsCsON1HOs8yeYaXTsYmzHCZq3IfzKFuNPAxvcb79CPhtq3vNK5new9N3XSwJyg==;EndpointSuffix=core.windows.net'
}
