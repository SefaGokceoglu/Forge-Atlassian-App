import ForgeUI, { Text, Row, Cell, Table, Head, Image } from "@forge/ui";
import React from "react";

function Changes({ Data }) {
  return (
    <Table>
      <Head>
        <Cell>
          <Text>Avatar</Text>
        </Cell>
        <Cell>
          <Text>Name</Text>
        </Cell>
        <Cell>
          <Text>Time</Text>
        </Cell>
        <Cell>
          <Text>Changed Fiels</Text>
        </Cell>
        <Cell>
          <Text>Changed From</Text>
        </Cell>
        <Cell>
          <Text>Changed To</Text>
        </Cell>
      </Head>
      {Data.slice(0)
        .reverse()
        .map((change) => {
          const date = change.created.split("T");
          return (
            <Row>
              <Cell>
                <Image src={change.author.avatarUrls["48x48"]} />
              </Cell>
              <Cell>
                <Text>{change.author.displayName}</Text>
              </Cell>
              <Cell>
                <Text>
                  {date[0].split("-")[2] +
                    "/" +
                    date[0].split("-")[1] +
                    "/" +
                    date[0].split("-")[0]}{" "}
                  {date[1].split(".")[0]}
                </Text>
              </Cell>
              <Cell>
                <Text>{change.items[0].field}</Text>
              </Cell>
              <Cell>
                <Text>{change.items[0].fromString}</Text>
              </Cell>
              <Cell>
                <Text>{change.items[0].toString}</Text>
              </Cell>
            </Row>
          );
        })}
    </Table>
  );
}

export default Changes;
