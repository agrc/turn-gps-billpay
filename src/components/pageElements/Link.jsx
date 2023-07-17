import PropTypes from 'prop-types';

export const Link = ({
                       href,
                       children,
                       target,
                       rel,
                       style = 'link'
                     }) => {
  const attributes = {
    target,
    rel,
    href
  };

  return <a {...attributes}>{children}</a>;
};
Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  target: PropTypes.string,
  rel: PropTypes.string
};