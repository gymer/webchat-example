import rest from 'rest'
import pathPrefix from 'rest/interceptor/pathPrefix'
import mime from 'rest/interceptor/mime'
import errorCode from 'rest/interceptor/errorCode'

let Rest = rest.wrap(mime, {mime: 'application/json'})
               .wrap(pathPrefix, {prefix: 'api'})
               .wrap(errorCode)

export default Rest
