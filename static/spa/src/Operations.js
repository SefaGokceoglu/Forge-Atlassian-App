import api from "@forge/api";

const ChangelogFieldName = "Change Logs";
export const getFieldData = async () => {
  const response = await api.asUser().requestJira(`/rest/api/3/field`);
  const fieldData = await response.json();
  return fieldData;
};

export const getChangeLogsFieldData = (fieldData) => {
  if (fieldData) {
    for (const field of fieldData) {
      if (field.name === ChangelogFieldName) {
        return field;
      }
    }
  }
  return undefined;
};

export const getIssueData = async (context) => {
  // @ts-ignore
  const issueId = context.extensionContext.issueId;
  const response = await api
    .asUser()
    .requestJira(`/rest/api/3/issue/${issueId}?expand=renderedFields`);
  const issueData = await response.json();
  return issueData;
};

export const getIssueChangeLogs = (ChangeLogsFieldData, issueData) => {
  if (
    ChangeLogsFieldData &&
    ChangeLogsFieldData.id &&
    issueData &&
    issueData.fields &&
    issueData.fields[ChangeLogsFieldData.id]
  ) {
    const ChangeLogs = [];
    for (const field of issueData.fields[ChangeLogsFieldData.id]) {
      console.log(`Found Changelogs field: ${JSON.stringify(field, null, 2)}`);
      ChangeLogs.push(field.value);
    }
    return ChangeLogs;
  }
  return undefined;
};
