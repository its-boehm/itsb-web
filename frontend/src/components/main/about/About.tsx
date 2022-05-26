import { FC, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Waypoint } from 'react-waypoint';
import SectionHeader from '../../shared/SectionHeader';
import Actions from './Actions';
import Contact from './Contact';
import Description from './Description';

type VisibilityState = {
  isVisibleImage: boolean;
  isVisibleWelcome: boolean;
};

const About: FC = () => {
  const [visibility, setVisibility] = useState<VisibilityState>({
    isVisibleImage: false,
    isVisibleWelcome: false,
  });

  const handleWaypoint = (box: 'image' | 'welcome', isEntry: boolean) => {
    if (box === 'image') {
      setVisibility({
        isVisibleImage: isEntry,
        isVisibleWelcome: visibility.isVisibleWelcome,
      });
    } else {
      setVisibility({
        isVisibleImage: visibility.isVisibleImage,
        isVisibleWelcome: isEntry,
      });
    }
  };

  return (
    <section className="About" id="about">
      {/* @ts-ignore */}
      <Waypoint onEnter={handleWaypoint.bind(null, 'image', true)} onLeave={handleWaypoint.bind(null, 'image', false)}>
        <div className="box box--image">
          <CSSTransition in={visibility.isVisibleImage} timeout={1500} classNames="design-bg">
            <div className="design-bg">
              <div className="img"></div>
            </div>
          </CSSTransition>
        </div>
      </Waypoint>

      {/* @ts-ignore */}
      <Waypoint
        onEnter={handleWaypoint.bind(null, 'welcome', true)}
        onLeave={handleWaypoint.bind(null, 'welcome', false)}
      >
        <div className="box box--description">
          <CSSTransition in={visibility.isVisibleWelcome} timeout={1500} classNames="inner-box">
            <div className="inner-box">
              <SectionHeader mainText="Yes, that's me" smallText="Begrüßung &amp; Vorstellung" bgText="Welcome" />
              <div className="content">
                <Description />
                <Contact />
                <Actions />
              </div>
            </div>
          </CSSTransition>
        </div>
      </Waypoint>
    </section>
  );
};

export default About;
