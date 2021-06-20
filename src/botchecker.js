let stats = {
    node1: {
        serverID: 'f6eb6c8d'
    }
}
const axios = require('axios');
setInterval(() => {

    //Public nodes
    for (let [node, data] of Object.entries(stats)) {
        setTimeout(() => {
            axios({
                url: 'https://panel.bocon.xyz' + "/api/client/servers/" + data.serverID + "/resources",
                method: 'GET',
                followRedirect: true,
                maxRedirects: 5,
                headers: {
                    'Authorization': 'Bearer ' + process.env.apikey,
                    'Content-Type': 'application/json',
                    'Accept': 'Application/vnd.pterodactyl.v1+json',
                }
            }).then(response => {
                let statusss = response.data.attributes.current_state
                if (statusss == 'running') {
                    return nodeStatus.set(node, {
                        timestamp: Date.now(),
                        status: true,
                        is_vm_online: true
                    })
                } else if (statusss == 'offline') {
                    return nodeStatus.set(node, {
                        timestamp: Date.now(),
                        status: false,
                        is_vm_online: true
                    })
                }
            }).catch((e) => nodeStatus.set(node, {
                timestamp: Date.now(),
                status: null,
                is_vm_online: false
            }));
        }, 800)
    }
}, 10000)