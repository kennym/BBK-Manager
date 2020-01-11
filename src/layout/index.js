// @flow
import React, { useContext, useState, useEffect } from 'react'
import web3 from 'web3'

// Data
import { Web3Context } from 'app'

// Utils
import { etherscanAddressLink, truncateHash } from '@brickblock/web3-utils'

// Components
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Button } from '@brickblock/styleguide'
import StyledAppBar from './components/appbar'
import StyledToolbar from './components/toolbar'

// Styles & Assets
import { withStyles } from '@material-ui/core'
import styles from './styles'

// Types
import type { Node, ComponentType } from 'react'

type OwnPropsT = {|
  children: Node,
|}

type InjectedPropsT = {| classes: { [string]: string } |}

type PropsT = {| ...OwnPropsT, ...InjectedPropsT |}

export const Layout = (props: PropsT) => {
  const [totalBalance, setState] = useState(0)
  const { children, classes } = props

  const { currentAccount, networkName } = useContext(Web3Context)

  useEffect(() => {
    const getTotalBalance = async () => {
      const minABI = JSON.parse(
        '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"contributorsShare","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_contributor","type":"address"},{"name":"_value","type":"uint256"}],"name":"distributeTokens","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"dead","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"initialSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"bonusDistributionAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"toggleDead","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"finalizeTokenSale","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"bonusTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"bonusShare","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"companyTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newAddress","type":"address"}],"name":"changeFountainContractAddress","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"tokenSaleActive","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fountainContractAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_recipient","type":"address"},{"name":"_value","type":"uint256"}],"name":"distributeBonusTokens","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"companyShare","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_bonusDistributionAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":false,"stateMutability":"nonpayable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"totalSupply","type":"uint256"},{"indexed":false,"name":"distributedTokens","type":"uint256"},{"indexed":false,"name":"bonusTokens","type":"uint256"},{"indexed":false,"name":"companyTokens","type":"uint256"}],"name":"TokenSaleFinished","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"burner","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]'
      )
      const Web3 = new web3(web3.givenProvider)
      const contract = new Web3.eth.Contract(
        minABI,
        '0x4a6058666cf1057eac3cd3a5a614620547559fc9'
      )

      const bal = await contract.methods
        .balanceOf('0xe043dd0c6712b862d68be955f4a031940fbb5513')
        .call()
      const decimals = await contract.methods.decimals().call()

      let balance = Web3.utils.hexToNumberString(bal)
      balance = balance / Math.pow(10, decimals)
      balance = Math.round((balance + Number.EPSILON) * 100) / 100
      setState(balance.toLocaleString())
    }
    getTotalBalance()
  }, [totalBalance])

  return (
    <Grid container>
      <Grid item xs={12}>
        <StyledAppBar position="static">
          <StyledToolbar>
            <Typography className={classes.grow} color="inherit" variant="h3">
              Total BBK staked: {totalBalance}
            </Typography>

            {currentAccount && networkName ? (
              <Button
                className={classes.headerLink}
                href={etherscanAddressLink(currentAccount, networkName)}
                variant="text"
              >
                Current Account:&nbsp;
                {currentAccount !== 'loading'
                  ? truncateHash(currentAccount)
                  : 'loading...'}
              </Button>
            ) : (
              `No Active Ethereum Account`
            )}
          </StyledToolbar>
        </StyledAppBar>

        <div className={classes.contentWrapper}>{children}</div>
      </Grid>
    </Grid>
  )
}

Layout.displayName = 'Layout'

const exportedComponent: ComponentType<OwnPropsT> = withStyles(styles)(Layout)

exportedComponent.displayName = 'LayoutHOC'

export default exportedComponent
