# openprofiler-client

Client Node.js for OpenProfiler distributed tracing system 

###How to use

```javascript
const openprofiler = require("openprofiler-client");
const tracer          = new openprofiler.Tracer(new openprofiler.recorders.WSRecorder('ws://localhost:7755'));
openprofiler.instruments.mysql(tracer,   'appName');
openprofiler.instruments.request(tracer, 'appName');
```