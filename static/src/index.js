import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import{ LocaleProvider} from "antd"

ReactDOM.render(
<LocaleProvider locale={zhCN}>
    <App />
</LocaleProvider>
, document.getElementById('root'));

serviceWorker.unregister();
