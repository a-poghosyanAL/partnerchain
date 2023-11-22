import { renderToStaticMarkup } from 'react-dom/server'
import './template.scss'

export default function DefaultHtml() {
  return renderToStaticMarkup(
    <div className='markdown-body'>
      <table border={0} cellPadding={0} cellSpacing={0} role="table">
        <tbody>
          <tr>
            <td valign="top" align="left">
              <table border={0} cellPadding={0} cellSpacing={0} role="table">
                <tbody>
                  <tr>
                    <td align="center">
                      <table align="center" border={0} cellPadding={0} cellSpacing={0} role="table">
                        <tbody>
                          <tr>
                            <td align="left">
                              <table border={0} cellPadding={0} cellSpacing={0} width="100%" role="table">
                                <tbody>
                                  <tr>
                                    <td className="border" align="left" width="100%" height={40}> &nbsp; </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table align="center" border={0} cellPadding={0} cellSpacing={0} role="table">
                                <tbody>
                                  <tr>
                                    <td align="left">
                                      <a target="_blank" rel="noopener noreferrer nofollow" href="https://camo.githubusercontent.com/9845e83c51015ef161fad5ab8585c8b14c0e1e336ac09c383675383994c61f5e/68747470733a2f2f6c6f676f2e636c6561726269742e636f6d2f706172746e65727461702e636f6d"><img src="https://camo.githubusercontent.com/9845e83c51015ef161fad5ab8585c8b14c0e1e336ac09c383675383994c61f5e/68747470733a2f2f6c6f676f2e636c6561726269742e636f6d2f706172746e65727461702e636f6d" width={96} data-canonical-src="https://logo.clearbit.com/partnertap.com" style={{ maxWidth: '100%' }} />
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table border={0} cellPadding={0} cellSpacing={0} width="100%" role="table">
                                <tbody>
                                  <tr>
                                    <td align="left" width="100%" height={40}> &nbsp; </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table border={0} cellPadding={0} cellSpacing={0} role="table">
                                <tbody>
                                  <tr>
                                    <td align="left">
                                      <h1 className='ql-align-center' dir="auto">Hello {'{'}{'{'}AccountOwner{'}'}{'}'},</h1>
                                      <br />
                                      <hr />
                                      <table border={0} cellPadding={0} cellSpacing={0} width="100%" role="table">
                                        <tbody>
                                          <tr>
                                            <td align="left" width="100%" height={16}> &nbsp; </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <p dir="auto"> </p>
                                      <table border={0} cellPadding={0} cellSpacing={0} width="100%" role="table">
                                        <tbody>
                                          <tr>
                                            <td align="left" width="100%" height={16}> &nbsp; </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <p dir="auto">{'{'}{'{'}PartnerAccountOwner{'}'}{'}'} from {'{'}{'{'}PartnerCompany{'}'}{'}'} has mapped with you on the following accounts:</p>
                                      <table border={0} cellPadding={0} cellSpacing={0} width="100%" role="table">
                                        <tbody>
                                          <tr>
                                            <td align="left" width="100%" height={16}> &nbsp; </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      <ul dir="auto">
                                        {'{'}{'{'}#each PartnerAccountNameList{'}'}{'}'}
                                        <li>{'{'}{'{'}this{'}'}{'}'}</li>
                                        {'{'}{'{'}/each{'}'}{'}'}
                                      </ul>
                                      <table border={0} cellPadding={0} cellSpacing={0} width="100%" role="table">
                                        <tbody>
                                          <tr>
                                            <td align="left" width="100%" height={16}> &nbsp; </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      <p dir="auto">Would you like to work with {'{'}{'{'}PartnerAccountOwner{'}'}{'}'} to upsell and expand Avant&apos;s footprint at these companies? If so, I’m happy to connect you directly with {'{'}{'{'}PartnerAccountOwner{'}'}{'}'}.</p>
                                      <table border={0} cellPadding={0} cellSpacing={0} width="100%" role="table">
                                        <tbody>
                                          <tr>
                                            <td align="left" width="100%" height={16}> &nbsp; </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      <p dir="auto">Please simply select yes or no at the bottom of this email, and I’ll proceed accordingly.</p>
                                      <table border={0} cellPadding={0} cellSpacing={0} width="100%" role="table">
                                        <tbody>
                                          <tr>
                                            <td align="left" width="100%" height={16}> &nbsp; </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      &nbsp; &nbsp;&nbsp;&nbsp;
                                      <div dir="auto">
                                        <table border={0} cellPadding={0} cellSpacing={0} width="100%" role="table">
                                          <tbody>
                                            <tr>
                                              <td align="center" valign="top">
                                                <table border={20} cellPadding={0} cellSpacing={0} role="table">
                                                  <tbody>
                                                    <tr>
                                                      <td align="center">
                                                        {/* <div className='brrr'> */}

                                                        <a href="{{ApproveLink}}">
                                                          Yes
                                                        </a>
                                                        {/* </div> */}
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                              <td align="center" valign="top">
                                                <table border={0} cellPadding={0} cellSpacing={0} role="table">
                                                  <tbody>
                                                    <tr>
                                                      <td align="center"> <a href="{{RejectLink}}">No</a> </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table border={0} cellPadding={0} cellSpacing={0} width="100%" role="table">
                                <tbody>
                                  <tr>
                                    <td align="left" width="100%" height={24}> &nbsp; </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div className="ql-align-center" dir="auto"> &nbsp;&nbsp;&nbsp;&nbsp; PartnerChain Copyright 2023. <br /> </div>
                              <table border={0} cellPadding={0} cellSpacing={0} width="100%" role="table">
                                <tbody>
                                  <tr>
                                    <td align="left" width="100%" height={24}> &nbsp; </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table >
    </div >
  )
}
