# Here are my points needed to be refactored
  # interface Props should have a meaningful name.
    (Old): Props
    (New): WalletPageProps

  # if we've already used FC<WalletPageProps>, then we can remove type of props.
    (Old): const WalletPage: React.FC<Props> = (props: Props) => {}
    (New): const WalletPage: React.FC<WalletPageProps> = (props) => {}

  # common interface can be saved in folders -> reusable and easier to maintain.
    (Old): save all in 1 file 
    (New): create WalletBalance.model.ts file for interfaces: WalletBalance, FormattedWalletBalance

  # WalletBalance is missing "blockchain" properties. Assume blockchain is string, as I found getPriority()switching blockchain as string. 
    (Old):
      interface WalletBalance {
        currency: string;
        amount: number;
      }
    (New):
      interface WalletBalance {
        currency: string;
        amount: number;
        blockchain: string;
      }

  # function getPriority is using any, change to string. If blockchain has other types than string, we can add logic to check if blockchain is typeof string. However, to keep it simple here, I'll assume it as string.
    (Old): const getPriority = (blockchain: any): number 
    (New): const getPriority = (blockchain: string): number

  # using rest as props for div is meaning less, should be removed. Optionally, we can use react fragment or <></> instead of div not to break some UIs.
    (Old): 
      <div {...rest}>
        {rows}
      </div>
    (New):
      <div>
        {rows}
      </div>
    (New + Optional):
      <>
        {rows}
      </>
  
  # According to above change, rest is no longer used. So, I will remove.
    (New): Remove
      const { children, ...rest } = props;


  # Move logic of formattedBalances into useMemo of sortedBalances to keep all logics in one place, and for memorization purpose, too.
    (Old):
      const formattedBalances = sortedBalances.map ...

    (New): 
      const sortedBalances = useMemo(() => {
        ...
        .map((balance: WalletBalance) => {
          return {
            ...balance,
            formatted: balance.amount.toFixed()
          }
        })
      })

  # As balances, prices are possibly having wrong data types or undefined. Then, I'll add ?. and a function to check type, for not breaking the page
    (New): 
      const sortedBalances = useMemo(() => {
        if (!(balances && Array.isArray(balances))) return []

        return balances?.filter((balance: WalletBalance) => {
          ....
        })?.sort((lhs: WalletBalance, rhs: WalletBalance) => {
          ....
        })?.map((balance: WalletBalance) => {
          ...
        });
      }, [balances, prices]);

  # logic inside balances filter is having some problems: balancePriority is defined but not used and for case lhsPriority > -99 and balance.amount > 0, no return
    (New): 
		  balances?.filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority > -99 && balance.amount <= 0
      })

  # logic inside sort is missing return for a case too
    (New):
      ?.sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        } else return 0;
      })

  # inside map, we can handle usdValue here to. This helps to make "prices" dependencies meaningful and we only need to map once instead of twice.
    # Update map functions
      (New):
        ?.map((balance: WalletBalance) => {
          const price = prices?.[balance.currency] || 0;
          const usdValue = price * balance.amount;
          return {
            ...balance,
            usdValue: usdValue,
            formatted: balance.amount.toFixed()
          }
        });
    # Update rows used balance.usdValue instead of recalculating usdValue
      (New): 
          const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
            return (
              <WalletRow
                className={props?.classes?.row}
                key={index}
                amount={balance.amount}
                usdValue={balance.usdValue}
                formattedAmount={balance.formatted}
              />
            )
          })
    # Update interface FormattedWalletBalance
      (Old):
        interface FormattedWalletBalance {
          currency: string;
          amount: number;
          formatted: string;
          usdValue: number;
        }
      (New):
        interface FormattedWalletBalance {
          currency: string;
          amount: number;
          formatted: string;
          usdValue: number;
        }


  # classes.row, classes is not defined -> Will throw error and break UI. Assume classes are from props, but not sure if we have, then I'll add "?." not to break page.
    (Old):
      className={classes.row}
    (New):
      className={props?.classes?.row}

  # Need to export default to add access to Wallet Page
    (New): export default WalletPage;

  # For memorization
    getPriority is no needed to be created on every render -> I move it to another file
    rows depends on sortedBalances, so I'll add useMemo for avoid memorization

# ###############################
# Some files and folders are added to make meaningful imports
  (New): create new files & folders
    components
      WallowRow.tsx
    hooks
      usePrices.ts
      useWalletBalances.ts
    models
      Box.model.ts
      WalletBalance.model.ts
    utils
      getPriority.ts
  (New): add interface Price in WalletBalance.model for usePrices hooks 
