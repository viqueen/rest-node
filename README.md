# rest-node (v-0.0.1)

Nodejs rest client wrapping request with promises

### install it

```bash
npm install rest-node --save
```

### use it

```javascript
'use strict'
let RestClient  = require('rest-node');
let Client      = new RestClient({
    endpoint : ''
});

Client.GET({
    path : 'some/resource/path'
});
```
### license

Apache-2.0
