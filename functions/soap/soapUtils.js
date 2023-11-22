import nodeUrl from 'url';
import path from 'path';
import fs from 'fs';

const dirname = nodeUrl.fileURLToPath(new URL('.', import.meta.url));
const fullPath = path.join(dirname, './ugrc_turngps_loginservice.wsdl');
export const WSDL_CONTENT = fs.readFileSync(fullPath, 'utf-8');

export const axiosConfig = {
  headers: {
    SOAPAction: 'Trimble.IS.AccountingServices/ILogin/CreateUserWithoutUserinfoAndReturnID',
    'Content-Type': 'text/xml; charset=utf-8',
  },
};

// "loginWithOrganization": "ugrc/chwardle2",
// "organizationId": 2,
// "password": "test",
// "primaryLoginWithOrganization": "ugrc/chwardle2",
// "email": "chwardle@utah.gov",
export const createUserWithoutUserinfoAndReturnIdData = (userObj) => `<?xml version="1.0" encoding="utf-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
    <SOAP-ENV:Header/>
    <SOAP-ENV:Body>
        <ns3:CreateUserWithoutUserinfoAndReturnID xmlns:ns2="http://schemas.datacontract.org/2004/07/Trimble.IS.AccountingData" xmlns:ns3="Trimble.IS.AccountingServices">
            <ns3:loginWithOrganization>${userObj.loginWithOrganization}</ns3:loginWithOrganization>
            <ns3:organizationId>${userObj.organizationId}</ns3:organizationId>
            <ns3:password>${userObj.password}</ns3:password>
            <ns3:primaryLoginWithOrganization>${userObj.primaryLoginWithOrganization}</ns3:primaryLoginWithOrganization>
            <ns3:email>${userObj.email}</ns3:email>
        </ns3:CreateUserWithoutUserinfoAndReturnID>
    </SOAP-ENV:Body>
</SOAP-ENV:Envelope>`;
