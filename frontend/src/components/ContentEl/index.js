import './index.css'

const ContentEl = (props) => {
    const { ele } = props; // Destructure props to access ele
    const { name, last, buy, sell, low, high } = ele;
    const avg=(low+high)/2
    const diff = ((avg - last) / avg) * 100;
    
    const formattedDifferencePer = parseFloat(diff.toFixed(2));

    const save=(avg-last)<0?(last-avg):(last-avg)*-1
    const classVal=(avg-last)>0?'greenClasssEl':'redClasssEl'

    const formatNumberToIndianSystem=(num)=> {
       
        let numStr = Math.floor(num).toString();
    
       
        let lastThree = numStr.slice(-3);
    
        
        let otherNumbers = numStr.slice(0, -3);
    
        if (otherNumbers !== '') {
            lastThree = ',' + lastThree;
        }
    
        let formattedNumber = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
    
        return '₹ '+formattedNumber;
    }
    

    return (
        <div>
        <div className="matterBox1" >
            <div className="matterBoxSub1">
                <div className="fontText1">0.1 %</div>
                <div className="average-header-subHeading">5 Mins</div>
            </div>
            <div className="matterBoxSub1">
                <div className="fontText1">0.97 %</div>
                <div className="average-header-subHeading">1 Hour</div>
            </div>
            <div >
                <div className="matterBoxSub1">
                    <div className="">
                        <span className="average-header-subHeading average-header-subtext">Best Price to Trade</span>
                    </div>
                    <div className="fontText2" >{formatNumberToIndianSystem(avg)}</div>
                    <div className="average-header-subHeading average-header-subtext">Average {name} net price including commission</div>
                </div>
            </div>
            <div className="matterBoxSub1">
                <div className="fontText1">5.13 %</div>
                <div className="average-header-subHeading">1 Day</div>
            </div>
            <div className="matterBoxSub1">
                <div className="fontText1">13.37 %</div>
                <div className="average-header-subHeading">7 Days</div>
            </div>
        </div>
        <table class="custom-table">
        <thead>
            <tr>
                <th><h4>#</h4></th>
                <th><h4>Platform</h4></th>
                <th><h4>Last Traded Price</h4></th>
                <th><h4>Buy / Sell Price</h4></th>
                <th><h4>Difference</h4></th>
                <th><h4>Savings</h4></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><h4>1</h4></td>
                <td>
                    
                        <h4><img src="Waqzirxlogopic.png" class="exchange-logo" alt="WazirX"/>WazirX</h4>
                    
                </td>
                <td><h4>{formatNumberToIndianSystem(last)}</h4></td>
                <td><h4>{formatNumberToIndianSystem(buy)} / {formatNumberToIndianSystem(sell)}</h4></td>
                <td><h4 className={classVal}>{formattedDifferencePer} %</h4></td>
                <td><h4 className={classVal}>{(avg-last)>0? `▲ ${formatNumberToIndianSystem(save)}`:`▼ ${formatNumberToIndianSystem(save)}`}</h4></td>
            </tr>
            <tr>
                <td><h4>2</h4></td>
                <td>
                <h4><img src="bitbns.png" class="exchange-logo" alt="Bitbns"/>Bitbns</h4>

                    
                </td>
                <td><h4>{formatNumberToIndianSystem(last)}</h4></td>
                <td><h4>{formatNumberToIndianSystem(buy)} / {formatNumberToIndianSystem(sell)}</h4></td>
                <td><h4 className={classVal}>{formattedDifferencePer} %</h4></td>
                <td><h4 className={classVal}>{(avg-last)>0? `▲ ${formatNumberToIndianSystem(save)}`:`▼ ${formatNumberToIndianSystem(save)}`}</h4></td>
            </tr>
            <tr>
                <td><h4>3</h4></td>
                <td>
                <h4><img src="colodax.png" class="exchange-logo" alt="colodax"/>colodax</h4>

                    
                </td>
                <td><h4>{formatNumberToIndianSystem(last)}</h4></td>
                <td><h4>{formatNumberToIndianSystem(buy)} / {formatNumberToIndianSystem(sell)}</h4></td>
                <td><h4 className={classVal}>{formattedDifferencePer} %</h4></td>
                <td><h4 className={classVal}>{(avg-last)>0? `▲ ${formatNumberToIndianSystem(save)}`:`▼ ${formatNumberToIndianSystem(save)}`}</h4></td>
            </tr>
            <tr>
                <td><h4>4</h4></td>
                <td>
                <h4><img src="zebpay.png" class="exchange-logo" alt="zebpay"/>zebpay</h4>

                    
                </td>
                <td><h4>{formatNumberToIndianSystem(last)}</h4></td>
                <td><h4>{formatNumberToIndianSystem(buy)} / {formatNumberToIndianSystem(sell)}</h4></td>
                <td><h4 className={classVal}>{formattedDifferencePer} %</h4></td>
                <td><h4 className={classVal}>{(avg-last)>0? `▲ ${formatNumberToIndianSystem(save)}`:`▼ ${formatNumberToIndianSystem(save)}`}</h4></td>
            </tr>

        </tbody>
    </table>
    <hr className='breakLine'/>
    <div className=" footterBottomsett1">
        <div className="footerEl1">
            <div className="footerEl2">
                <div className="footer-text">Copyright © 2019</div>
            <div className="footer-text">HodlInfo.com</div>
            </div>
            
            <div className="footer-text " >
                <a href="mailto:support@hodlinfo.com" className="footer-text-link">Support</a>
            </div>
            </div>
            <hr className=' breakLineW'/>
            </div>
            
        </div>
    );
};

export default ContentEl;
