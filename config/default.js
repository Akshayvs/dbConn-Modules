/**
 * Created by asonawane on 7/6/16.
 */
'use strict';

module.exports = {
    //for connecting to Gannett CB cluster
    gannett:  {
        couchbase_cluster_ip :'10.84.100.220' ,
        bucket_username: 'presentation_assets' ,
        bucket_password: 'PassW0rd'
    },

    local: {
        couchbase_cluster_ip: '127.0.0.1',
        bucket_username: 'travel-sample',
        bucket_password: ''
    }
}