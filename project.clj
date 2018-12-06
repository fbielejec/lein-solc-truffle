(defproject lein-solc-truffle "1.0.0"
  :description "Using lein-solc for compiling truffle artifact"
  :url "https://github.com/fbielejec/lein-solc-truffle"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}

  :plugins [[lein-solc "1.0.11"]]

  :solc {:src-path "contracts"
         :build-path "/build/contracts/" ;;"resources/public/contracts/build/"
         :abi? false
         :bin? false ;; change to true to reproduces the problem
         :byte-count true
         :truffle-artifacts? true
         :contracts ["Migrations.sol" "TestContract.sol"
                     "proxy/MutableForwarder.sol" "proxy/DelegateProxy.sol"]})
