import api from "@forge/api";
import ForgeUI, { Button } from "@forge/ui";

export default class ChangelogFieldAdmin {
  render = () => {
    const createCustomField = async () => {
      const payload = {
        searcherKey:
          "com.atlassian.jira.plugin.system.customfieldtypes:multiselectsearcher",
        name: "Change Logs",
        description: "Custom field for Change Logs",
        type: "com.atlassian.jira.plugin.system.customfieldtypes:select",
      };
      const create_options = {
        method: "POST",
        body: JSON.stringify(payload),
      };
      const response_from_create = await api
        .asUser()
        .requestJira(`/rest/api/3/field`, create_options);
      console.log("Create country field response:", response_from_create);
      const ChangeLogsFieldData = await response_from_create.json();

      const fieldId = ChangeLogsFieldData.schema.customId;

      const add_default_options = {
        method: "POST",
      };
      const response = await api
        .asUser()
        .requestJira(
          `/rest/api/3/screens/addToDefault/customfield_${fieldId}`,
          add_default_options
        );
      console.log(
        "Add Custom Change Log field to default screen response:",
        response
      );
      const responseData = await response.json();
      console.log(" * responseData:", responseData);
    };

    return (
      <Button text="Create Change Log Field" onClick={createCustomField} />
    );
  };
}
