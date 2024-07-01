import { PowerBIEmbed } from 'powerbi-client-react';
import {models} from 'powerbi-client';
import './dashboard.css'

export const Dashboard = () => {
  return (
    <div className='powerbi-embed'>
      <PowerBIEmbed
        embedConfig = {{
          type: 'report', 
          id: 'dd085656-c233-4935-af45-49e5b8914284',
          embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=dd085656-c233-4935-af45-49e5b8914284&groupId=c39b5f57-77da-4d8e-9229-40a3e777e1d2&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19',
          accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyIsImtpZCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYTU3ZjdkOTItMDM4ZS00ZDRjLTgyNjUtN2NkMmJlYjMzYjM0LyIsImlhdCI6MTcxOTgzNTU5NywibmJmIjoxNzE5ODM1NTk3LCJleHAiOjE3MTk4NDAwODQsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84WEFBQUF3S092d1QrUEM4Um1kL1huYTBtb2hvVTI0SW1FTENyeEZYeXUxWjdFREdMUEZLMkkyM250a3N6TlNCbnhIU0h1IiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiVmVybWEiLCJnaXZlbl9uYW1lIjoiUm9zaGFuIiwiaWR0eXAiOiJ1c2VyIiwiaXBhZGRyIjoiMjQwNToyMDE6NjAxODozODU0OjI4MTE6ZGFiMTo3NWI3OjdlMWUiLCJuYW1lIjoiUm9zaGFuIiwib2lkIjoiZTQ1ZDk0MmItYjFhZS00ZWVmLWJmZTItMTNmZjI2OWY4Yzc2IiwicHVpZCI6IjEwMDMyMDAyNTIzRDcwM0UiLCJyaCI6IjAuQVQ0QWtuMV9wWTREVEUyQ1pYelN2ck03TkFrQUFBQUFBQUFBd0FBQUFBQUFBQUEtQUFNLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6Ik5YZUU4dTJUTW1EM0EwZkMxUEVBLXByaFBsc2ZKaXk2dmdqcGh1TU0tWnciLCJ0aWQiOiJhNTdmN2Q5Mi0wMzhlLTRkNGMtODI2NS03Y2QyYmViMzNiMzQiLCJ1bmlxdWVfbmFtZSI6IjIyMDFtYzM0X3Jvc2hhbkBpaXRwLmFjLmluIiwidXBuIjoiMjIwMW1jMzRfcm9zaGFuQGlpdHAuYWMuaW4iLCJ1dGkiOiJOVlJjTy1VLU9FYWItSDlxZE9uTEFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2lkcmVsIjoiMSAyIn0.VR4uPScaU70G-ohujolHTz0OLn6OFmql--d-5ALJal5Eamknj-Q4Z2teSqZeYKH1tAMC_gWSVKhwtgcFfxb8SBss4rzDZgWtYHNTnVTQ5kqXVpvjB4ruLp58eklHm7yPeLlhje4Z2UwVvORebjE6paw9NiPGfmiIxjQQAoCErVTUuLrZeQpaQP1o9uZPiNDVY3U6wkHK_uhRUFHQqWQGsNid1m2X0ZAd3bPdLmf36qbMBowc6q8VT6LIhj7SpdpSsMCZRoZ7u5nsIufqftyekcLjOtQKIR0wSzYpx3F01aM768aJ0mqsjmBjJBxiqXdcPPeErFzKmW7WpTsSKoo0BQ',
          tokenType: models.TokenType.aad,
          settings: {
            panes: {
              filters: {
                expanded: false,
                visible: false
              }
            },
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