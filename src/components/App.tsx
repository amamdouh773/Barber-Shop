import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../styles/App.css";
import EmpPage from "./EmpPage";
import EmpDetails from "./emps-details";
import FinancialPage from "./financialPage";
import Header from "./Header";
import ProductDetails from "./product-details";
import ProductPage from "./ProductsPage";
import SevicesPage from "./services-page";

const client = new ApolloClient({
  uri: "https://infinite-peak-89749.herokuapp.com/v1/graphql",
  cache: new InMemoryCache(),
});

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/" exact component={SevicesPage} />
            <Route path="/products/:id" component={ProductDetails} />
            <Route path="/employees/:id" component={EmpDetails} />
            <Route path="/products" exact component={ProductPage} />
            <Route path="/employees" component={EmpPage} />
            <Route path="/financial" component={FinancialPage} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
