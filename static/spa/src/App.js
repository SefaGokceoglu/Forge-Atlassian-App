import React from "react";
import api from "@forge/api";
import ForgeUI, {
  Button,
  Fragment,
  IssuePanel,
  IssuePanelAction,
  render,
  useEffect,
  useProductContext,
  useState,
  useAction,
} from "@forge/ui";
import ChangelogFieldAdmin from "./components/AddCustomFieldButton";
import {
  getFieldData,
  getChangeLogsFieldData,
  getIssueData,
} from "./Operations";

import Changes from "./components/Changes/Changes";

function App() {
  const context = useProductContext();

  const [fieldData] = useAction(
    (value) => value,
    async () => {
      return await getFieldData();
    }
  );
  const [initialChangeLogsFieldData] = useAction(
    (value) => value,
    () => {
      return getChangeLogsFieldData(fieldData);
    }
  );
  const [ChangeLogsFieldData, setChangeLogsFieldData] = useState(
    initialChangeLogsFieldData
  );

  const [issueData] = useAction(
    (value) => value,
    async () => {
      return await getIssueData(context);
    }
  );
  const [Data, setData] = useState([]);

  useEffect(async () => {
    const response = await api
      .asUser()
      .requestJira(
        `/rest/api/3/issue/${context.platformContext.issueId}/changelog`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

    console.log(`Response: ${response.status} ${response.statusText}`);
    const data = await response.json();
    setData(data.values);
  }, []);

  const exportData = async () => {
    const field_response = await api
      .asApp()
      .requestJira(`/rest/api/3/field/${ChangeLogsFieldData.id}/context`, {
        headers: {
          Accept: "application/json",
        },
      });

    console.log(
      `Response: ${field_response.status} ${field_response.statusText}`
    );
    const data = await field_response.json();

    const options_response = await api
      .asApp()
      .requestJira(
        `/rest/api/3/field/${ChangeLogsFieldData.id}/context/${data.values[0].id}/option`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

    console.log(
      `Response: ${options_response.status} ${options_response.statusText}`
    );
    const CF_options = await options_response.json();

    const payload = {
      options: [],
    };
    for (const change of Data) {
      let flag = 0;
      CF_options.values.map((option) => {
        option.value ===
        change.id +
          " " +
          change.author.displayName +
          " " +
          change.created.split("T")[0].split("-")[2] +
          "/" +
          change.created.split("T")[0].split("-")[1] +
          "/" +
          change.created.split("T")[0].split("-")[0] +
          " " +
          change.created.split("T")[1].split(".")[0]
          ? (flag = 1)
          : null;
      });
      if (flag === 0) {
        payload.options.push({
          value:
            change.id +
            " " +
            change.author.displayName +
            " " +
            change.created.split("T")[0].split("-")[2] +
            "/" +
            change.created.split("T")[0].split("-")[1] +
            "/" +
            change.created.split("T")[0].split("-")[0] +
            " " +
            change.created.split("T")[1].split(".")[0],
        });
      }
      // @ts-ignore
      // if (countryInfo.name) {
      //   payload.options.push({
      //     // @ts-ignore
      //     value: change.author.displayName +
      //   });
      // } else {
      //   // @ts-ignore
      //   throw new Error(`No name found for ID: ${countryInfo.id}`);
      // }
    }

    if (payload.options[0] != undefined) {
      const options = {
        method: "POST",
        body: JSON.stringify(payload),
      };
      const response = await api
        .asUser()
        .requestJira(
          `/rest/api/3/field/${ChangeLogsFieldData.id}/context/${data.values[0].id}/option`,
          options
        );
      console.log("Add country field options response:", await response.json());
    }
  };

  // const createCustomField = async () => {
  //   const payload = {
  //     searcherKey:
  //       "com.atlassian.jira.plugin.system.customfieldtypes:multiselectsearcher",
  //     name: "Change Logs",
  //     description: "Custom field for Change Logs",
  //     type: "com.atlassian.jira.plugin.system.customfieldtypes:select",
  //   };
  //   const create_options = {
  //     method: "POST",
  //     body: JSON.stringify(payload),
  //   };
  //   const response_from_create = await api
  //     .asUser()
  //     .requestJira(`/rest/api/3/field`, create_options);
  //   console.log("Create country field response:", response_from_create);
  //   const ChangeLogsFieldData = await response_from_create.json();

  //   const fieldId = ChangeLogsFieldData.schema.customId;

  //   const add_default_options = {
  //     method: "POST",
  //   };
  //   const response = await api
  //     .asUser()
  //     .requestJira(
  //       `/rest/api/3/screens/addToDefault/customfield_${fieldId}`,
  //       add_default_options
  //     );
  //   console.log(
  //     "Add Custom Change Log field to default screen response:",
  //     response
  //   );
  //   const responseData = await response.json();
  //   console.log(" * responseData:", responseData);
  // };

  return (
    <IssuePanel
      actions={[<IssuePanelAction text="Export Logs" onClick={() => {}} />]}
    >
      <Changes Data={Data} />
      <Fragment>
        <Button
          text="Export Change Logs to Custom Field"
          onClick={exportData}
          appearance="primary"
        ></Button>
        {ChangeLogsFieldData === undefined
          ? new ChangelogFieldAdmin().render()
          : null}
      </Fragment>
    </IssuePanel>
  );
}

export default render(<App />);
