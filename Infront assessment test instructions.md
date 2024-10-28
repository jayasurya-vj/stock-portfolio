# Infront Assessment - Developer assignment


## Task

Create a (simple) web solution that enables a user to maintain a stock portfolio. A stock portfolio can best be compared to a shopping cart or inventory list containing a number of products (stocks) that are bought at a certain price.

This portfolio tool should support at least:

1. Show a list of stocks the portfolio contains, with the following columns:
    * Symbol
    * Name
    * Current price
    * Number of contracts
    * Buy value
    * Current value
    * % yield
2. Allow adding/removing a position    
3. Use a service to retieve stock prices & names (see end of this document).

### Example

| Symbol  | Name      | Price  | #   | Bought     | Current    | Yield      |   |
|---------|-----------|-------:|----:|-----------:|-----------:|-----------:|---|
| ABN.NL  | ABN AMRO  | 22.08  | 10  | 210.00     | 220.80     | +5.12%     | X |
| INGA.NL | ING Group | 12.496 | 10  | 138.21     | 124.96     | -9.59%     | X |
| **Total**                       |||| **348.21** | **334.96** | **-3.81%** |   |


| Add stock               ||
|------------|------------:|
| Symbol:    | [_______]   |
| Contracts: | [_______]   |
| Buy price: | [_______]   |
|            | [ Execute ] |


## Bonus points

* Adjust price data at random intervals with a random values (positive or negative) to simulate market changes; prices should never decrease to 0 or below
* Ensure a persistence mechanism
* Maintain a single position when the same symbol is added multiple times
* Option to buy/sell a number of shares 
* Support multiple currencies and normalize to EUR
* Support multiple accounts / portfolios
* Ensure the solution contains a test coverage of ~80%
* Show a pie chart of the portfolio element values (e.g., using Highcharts)

## Acceptance criteria

* We expect code that compiles and runs
* For full-stack developers
  * At least two bonus points should be implemented as part of the solution
* For front-end developers
  * At least three bonus points should be implemented as part of the solution

## Delivery

Please provide a ZIP file or link to an online code repostory where we can get the code. Instructions on how to run the solution should be included with the delivery.

## Price data service

For the price data, you can use a simple test data service service, for which you can find an Swagger/OpenAPI end point at

https://test.solutions.vwdservices.com/internal/intake-test/sample-data/swagger

A list of common symbols is:

| Symbol         | Name                      |
|----------------|---------------------------|
| **Dutch Stocks**                           |
| `AEX.NL`       | **AEX Index**             |
| `AALB.NL`      | Aalberts                  |
| `ABN.NL`       | ABN AMRO Bank             |
| `ADYEN.NL`     | Adyen                     |
| `AGN.NL`       | Aegon                     |
| `AD.NL`        | Ahold Delhaize            |
| `AKZA.NL`      | Akzo Nobel                |
| `MT.NL`        | ArcelorMittal             |
| `ASML.NL`      | ASML                      |
| `ASRNL.NL`     | ASR Nederland             |
| `DSM.NL`       | DSM                       |
| `GLPG.NL`      | Galapagos                 |
| `HEIA.NL`      | Heineken                  |
| `IMCD.NL`      | IMCD                      |
| `INGA.NL`      | ING                       |
| `KPN.NL`       | KPN                       |
| `NN.NL`        | NN Group                  |
| `PHIA.NL`      | Philips Koninklijke       |
| `RAND.NL`      | Randstad                  |
| `REN.NL`       | RELX                      |
| `RDSA.NL`      | Royal Dutch Shell A       |
| `TKWY.NL`      | Takeaway.com              |
| `URW.NL`       | Unibail-Rodamco-Westfield |
| `UNA.NL`       | Unilever                  |
| `VPK.NL`       | Vopak                     |
| `WKL.NL`       | Wolters Kluwer            |
| **US Stocks**                              |
| `AAPL.Q`       | Apple                     |
| `AMZN.Q`       | Amazon                    |
| `FB.Q`         | Facebook                  |
| `MSFT.Q`       | Microsoft                 |
| **Exchange Rates**                         |
| `EUR.FXVWD`    | EUR/USD                   |
| `USDEUR.FXVWD` | USD/EUR                   |