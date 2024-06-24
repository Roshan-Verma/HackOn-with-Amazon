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
          accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6InE3UDFOdnh1R1F3RE4yVGFpTW92alo4YVp3cyIsImtpZCI6InE3UDFOdnh1R1F3RE4yVGFpTW92alo4YVp3cyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYTU3ZjdkOTItMDM4ZS00ZDRjLTgyNjUtN2NkMmJlYjMzYjM0LyIsImlhdCI6MTcxOTIwODU0NiwibmJmIjoxNzE5MjA4NTQ2LCJleHAiOjE3MTkyMTQxNDYsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84WEFBQUFHQUsvSUZWTGpFZ3ZRbzBCNWVrTUhDTFY4SlJCV3gvV1p6aGZmQXlWV0kyYis0VTNLZFNRZmEwMVgvdkE0aXZVIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiVmVybWEiLCJnaXZlbl9uYW1lIjoiUm9zaGFuIiwiaWR0eXAiOiJ1c2VyIiwiaXBhZGRyIjoiMjQwNToyMDE6NjAxODozODU0OjM5ZmE6ZGYzMjpjMGQ3OmI5YjIiLCJuYW1lIjoiUm9zaGFuIiwib2lkIjoiZTQ1ZDk0MmItYjFhZS00ZWVmLWJmZTItMTNmZjI2OWY4Yzc2IiwicHVpZCI6IjEwMDMyMDAyNTIzRDcwM0UiLCJyaCI6IjAuQVQ0QWtuMV9wWTREVEUyQ1pYelN2ck03TkFrQUFBQUFBQUFBd0FBQUFBQUFBQUEtQUFNLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6Ik5YZUU4dTJUTW1EM0EwZkMxUEVBLXByaFBsc2ZKaXk2dmdqcGh1TU0tWnciLCJ0aWQiOiJhNTdmN2Q5Mi0wMzhlLTRkNGMtODI2NS03Y2QyYmViMzNiMzQiLCJ1bmlxdWVfbmFtZSI6IjIyMDFtYzM0X3Jvc2hhbkBpaXRwLmFjLmluIiwidXBuIjoiMjIwMW1jMzRfcm9zaGFuQGlpdHAuYWMuaW4iLCJ1dGkiOiJYT3dPbGZJaFUwR3plT3lLYjdkdUFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2lkcmVsIjoiMjAgMSJ9.F8LkGVHY8Fmx2_6vgGvKkgB2PtmxSStCu6RKZmcJenxwHVhGt7ZNOUSS_ua3Ahz_5FePhBBS27XfNWlHIQmrbDonEwWhRtiCIwkHhkplvfriM9uL7uKVH_r9yafHg33VmiouGOlp5-WPHG-uQCtYginVo4NX-eDiT7zGMx7Ho0psD1Jw05ZrNeN5kS3oDl8drxUjFM7e7YR8zmxCd2wfs2fV5ytXruPWsCGdsjvVR7UnTRRy78wcBgZ2QbGbY3ByTKauGUL9ut4J2BKLl7CkTyL2PkMtEEYVStzsApE9V2ErhSZe6620-ACAsRLAAE7XVAgPbogAmrxP19sbEo17Sw",
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