import { CardContent, Grid } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import { Layout } from "../components/layout/Layout";
import Card from "@mui/material/Card";
import { EntryList, NewEntry } from "../components/ui";

export default function Home() {
  return (
    <Layout title="hola">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="pending"></CardHeader>
            <NewEntry />
            <EntryList status="pending" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="in progress"></CardHeader>
            <EntryList status="progress" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Done"></CardHeader>
            <EntryList status="finished" />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
