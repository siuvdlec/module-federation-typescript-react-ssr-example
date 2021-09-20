import * as React from 'react'
import loadable from '@loadable/component'
import {Switch, Route} from 'react-router-dom';

const Page = loadable(() => import(`./Page`))
const PageWithParam = loadable(() => import(`./PageWithParam`))

const App: React.FC = () => {
  return (<div>
    <div>
        <Switch>
          <Route path="/page" component={Page}/>
          <Route
            path="/page-with-param/:x"
            render={routeProperties =>
              {
                console.log(routeProperties.match)

                return <PageWithParam x={parseInt(routeProperties.match.params.x)} /> 
              }
            }
            />
            <Route component={() => <>Not found!!</>} />
        </Switch>
    </div>
  </div>)
}

export default App
