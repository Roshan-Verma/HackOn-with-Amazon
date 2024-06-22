import { PowerBIEmbed } from 'powerbi-client-react';
import {models} from 'powerbi-client';
import './dashboard.css'

export const Dashboard = () => {
  return (
    <div className='powerbi-embed'>
      <PowerBIEmbed
        embedConfig = {{
          type: 'report',   // Supported types: report, dashboard, tile, visual, qna, paginated report and create
          id: 'dd085656-c233-4935-af45-49e5b8914284',
          embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=dd085656-c233-4935-af45-49e5b8914284&groupId=c39b5f57-77da-4d8e-9229-40a3e777e1d2&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19',
          accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6InE3UDFOdnh1R1F3RE4yVGFpTW92alo4YVp3cyIsImtpZCI6InE3UDFOdnh1R1F3RE4yVGFpTW92alo4YVp3cyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYTU3ZjdkOTItMDM4ZS00ZDRjLTgyNjUtN2NkMmJlYjMzYjM0LyIsImlhdCI6MTcxOTA3MTY2MiwibmJmIjoxNzE5MDcxNjYyLCJleHAiOjE3MTkwNzY4MTEsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84WEFBQUFuUlVjenNUL01pemdDcUVLS0N2VTA4QWEySmpjWGlrLzI0VHBLOHh2ZXBGY1dka0Jvc3ZpSEdiclBrZkpGQ2E4IiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiVmVybWEiLCJnaXZlbl9uYW1lIjoiUm9zaGFuIiwiaWR0eXAiOiJ1c2VyIiwiaXBhZGRyIjoiMjQwNToyMDE6NjAxODozODU0OmZkYWE6OGY4YzoyOTU4OjllNmMiLCJuYW1lIjoiUm9zaGFuIiwib2lkIjoiZTQ1ZDk0MmItYjFhZS00ZWVmLWJmZTItMTNmZjI2OWY4Yzc2IiwicHVpZCI6IjEwMDMyMDAyNTIzRDcwM0UiLCJyaCI6IjAuQVQ0QWtuMV9wWTREVEUyQ1pYelN2ck03TkFrQUFBQUFBQUFBd0FBQUFBQUFBQUEtQUFNLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6Ik5YZUU4dTJUTW1EM0EwZkMxUEVBLXByaFBsc2ZKaXk2dmdqcGh1TU0tWnciLCJ0aWQiOiJhNTdmN2Q5Mi0wMzhlLTRkNGMtODI2NS03Y2QyYmViMzNiMzQiLCJ1bmlxdWVfbmFtZSI6IjIyMDFtYzM0X3Jvc2hhbkBpaXRwLmFjLmluIiwidXBuIjoiMjIwMW1jMzRfcm9zaGFuQGlpdHAuYWMuaW4iLCJ1dGkiOiJScFFCa0J0b0NVZTVkV1ltcUtGSEFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2lkcmVsIjoiMSAxNCJ9.qs-XA-MqDynBKuQ2TdkZcJ13ibbgKkaJBIhHMj2XUEU7PiZ4LDlB1K7h9JQGwKYZFs-4DncB1ooI9pGvC_hPW9g8lTS_v5USlI8kECAEZ3wL35EuE8cKZlIamTvcY10cTPbDmoR3LovIE4mz6edyYWrFUfmpHM6G4DT3z_xees-rp5sPjVDwWl8O-1pnY_daWp7aEQ2SGZUznUfqb0dpOW-RgcjDX6jCNYRiGSwGmYfyD6our8LIy-39oj0cGzrX-BCTMuf_8bUpxMRlSQYyohC9TSVxuQ-KVWfpkhNoYsE9kmejuGCyvKrwOxGMELJyduijtyS03Sf5RiQuc4KeDg",
          tokenType: models.TokenType.aad, // Use models.TokenType.Aad for SaaS embed
          settings: {
            panes: {
              filters: {
                expanded: false,
                visible: false
              }
            },
            // background: models.BackgroundType.Transparent,
          }
        }}

        eventHandlers = {
          new Map([
            ['loaded', function () {console.log('Report loaded');}],
            ['rendered', function () {console.log('Report rendered');}],
            ['error', function (event) {console.log(event.detail);}],
            ['visualClicked', () => console.log('visual clicked')],
            ['pageChanged', (event) => console.log(event)],
          ])
        }

        cssClassName = { "Embed-container" }

        getEmbeddedComponent = { (embeddedReport) => {
          window.report = embeddedReport;
        }}
      />
      </div>
  )
}