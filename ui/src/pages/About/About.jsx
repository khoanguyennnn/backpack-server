import classNames from 'classnames/bind';
import styles from './About.module.scss';

import about from '../../assets/img/about.jpg';

const cx = classNames.bind(styles)

function About() {
    return (
        <div className={cx('wrapper')}>
            <div>
                <img src={about} alt="" />
            </div>
            <div className={cx('content')}>
                <h3>FIND THE BEST BAG FOR YOU</h3>
                <p>
                    Looking for the best bag? Melanophile makes iconic backpacks and bags for men and women, 
                    for travel and school, for outdoor and city adventures. Grab your water bottle and find a bag or messenger bag 
                    that will help you discover the world and never go back!
                </p>
                <br />
                <h3>BACKPACKS FOR ANY ADVENTURE</h3>
                <p>
                    Grab a bag that showcases where you've been, where you're going, and who you are. 
                    We've got all the styles—and, let's be honest, plenty of personality. 
                    Go ahead, rock a look that's all you with our new arrivals.
                    <br />
                    From florals to fun pops of color, shop our best-sellers to round out your look. 
                    Express yourself with dozens of prints from classic camo to the fan-favorite galaxy prints. 
                    Level up your look with a mesh bag or a leather bag made with premium vegan leather that is built to last. 
                    If you're worried about getting your bag wet when it's raining, you can't go wrong with the water-resistant Cool Student bag.
                </p>
                <br />
                <h3>PACK MORE. EVERYDAY. 24/7.</h3>
                <p>
                    Go ahead, carry a spare everything with Melanophile today. 
                    All of our school backpacks are precisely engineered with plenty of hands-free storage for all of your essentials. 
                    Our padded laptop sleeves allow you to pack a 13-inch laptop or a 15-inch laptop to ensure it's protected during your commute. 
                    Plus, functional extras will help you go the distance. 
                    Our commuter backpacks are built with media in mind so you can protect your tech while on the move. 
                    Explore our travel backpacks or duffel bags before hitting the road if you're headed out of town. 
                    Plus, our durable outdoor convertible backpacks and hiking backpacks are ideal for tackling the unexpected.
                </p>
            </div>
        </div>
    )
}

export default About