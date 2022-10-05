// For external API calls
//const axios = require('axios');
import axios from 'axios';
//import hubspot from '@hubspot/api-client';
const pk = 'pat-eu1-3fb3de60-9d63-4d01-a9de-e57fb89d1533'

//Authentications
//const hubspotClient = new hubspot.Client({ accessToken: pk });
//console.log(JSON.stringify(process.env.HUBSPOT_PK, null, 2));
//Functions


// get all associations
const getAllAssociations = async (fromObjectType, fromObjectId, toObjectType) => {
    var limit = 500;
    try {
        const apiResponse = await axios({
            url: `https://api.hubapi.com/crm/v3/objects/${fromObjectType}/${fromObjectId}/associations/${toObjectType}?limit=${limit}`,
            headers: {
                'Authorization': `Bearer ${pk}`,
                'Content-Type': 'application/json'
            }
        })
        // console.log(JSON.stringify(Object.keys(apiResponse), null, 2));
        return apiResponse.data.results;

    } catch (e) {
        e.message === 'HTTP request failed'
            ? console.error("Get all " + fromObjectType + " associated with " + fromObjectId, JSON.stringify(e.response, null, 2))
            : console.error("Get all " + fromObjectType + " associated with " + fromObjectId, e)
    }
}

// get properties batch
const getPropertiesBatch = async (objectType, properties, inputs) => {
    // Get all memberships with properties
    try {
        const apiResponse = await axios({
            method: "POST",
            data: {
                "properties": properties,
                "inputs": inputs
            },
            headers: {
                'Authorization': `Bearer ${pk}`,
                'Content-Type': 'application/json'
            },
            url: `https://api.hubapi.com/crm/v3/objects/${objectType}/batch/read?archived=false`
        })
        // console.log(JSON.stringify(apiResponse.data.results, null, 2));
        return apiResponse.data.results;
    } catch (e) {
        e.message === 'HTTP request failed'
            ? console.error("getPropertiesBatch() - " + objectType, JSON.stringify(e.response, null, 2))
            : console.error("getPropertiesBatch() - " + objectType, e)
    }
}

//Main
//Init
let company_id = '6352928225'
//To Do
// get the contacts associated with project

try {

    var contacts_associated_with_company = await getAllAssociations("0-2", company_id, "CONTACTS");
    // console.log('contacts_associated_with_company: ' + contacts_associated_with_company);

    // init contact properties
    var contact_properties = [
        'firstname',
        'lastname',
        'email',
        'hs_object_id'
    ]

    //Get contact properties i.e. firstname, lastname
    const contact_props = await getPropertiesBatch("0-1", contact_properties, contacts_associated_with_company);
    //   console.log('contact_props:' + JSON.stringify(contact_props));

    //Call contacts
    // const { data } = await axios.get("https://zenquotes.io/api/random");

    // let data = await get_inv(enc, config)

    //  console.log("data is" + JSON.stringify(data.data))

    /*   let inv_obj = {}
      for (let inv of data.data.Invoices) {
          //  console.log(inv.InvoiceNumber)
          inv_obj[inv.InvoiceNumber] = {
              'Invoice Number': inv.InvoiceNumber,
              'Due Amount': inv.AmountDue,
              'Total Amount': inv.Total,
              'Due Date': inv.DueDateString,
              'Date Sent': inv.DateString,
              //  'Activity Date': inv.
              'Status': inv.Status
          }
      } */

    function build_items(contact) {
        //Build headers array as list of list with 1st cell as the display label on the crm card, and 2nd cell as the property attribute in the invoice object
        let contact_headers = [["First Name", "firstname"], ["Last Name", "lastname"], ["Email", "email"], ["ID", "hs_object_id"]]

        let items_list = []

        for (let hh of contact_headers) {
            // console.log("inv.hh " + inv[hh])
            let tmp = {}
            tmp["label"] = hh[0]
            tmp["value"] = String(contact.properties[hh[1]])
            items_list.push(tmp)
        }
        return items_list
    }

    function build_card() {
        let heading = {
            "type": "heading",
            "text": "Contacts"
        }
        let divider = {
            "type": "divider",
            "distance": "small"
        }

        let global_items = {}

        for (let contact of contact_props) {
            global_items[contact.id] = build_items(contact)
        }

        let crm_card = []
        crm_card.push(heading)

        for (let contact in global_items) {
            let llist = {}
            llist["type"] = "descriptionList"
            crm_card.push(divider)
            llist["items"] = global_items[contact]
            crm_card.push(llist)
        }

        return crm_card
    }

    var ccard = build_card()

    console.log(JSON.stringify(ccard))
    let action_button = {
        type: "button",
        text: "Assign Task",
        onClick: {
            type: "SERVERLESS_ACTION_HOOK",
            serverlessFunction: "crm-card"
        }
    }
    ccard.push(action_button)

    console.log("ccard" + JSON.stringify(ccard))

    //  let prettyOutput = stringify(ccard);
    //  console.log("pretty after " + JSON.stringify(ccard))

    const quoteSections = [
        {
            type: "tile",
            body: [
                {
                    type: "text",
                    format: "markdown",
                    text: `**Hello , here's your quote for the day**!`
                },
                {
                    type: "text",
                    format: "markdown",
                    text: `**Quote**: `
                },
                {
                    type: "text",
                    format: "markdown",
                    text: `**Author**: `
                }
            ]
        },
        {
            type: "button",
            text: "Get new quote",
            onClick: {
                type: "SERVERLESS_ACTION_HOOK",
                serverlessFunction: "crm-card"
            }
        }
    ];

    // console.log(quoteSections)

} catch (error) {
    console.log("err is " + error)

}
