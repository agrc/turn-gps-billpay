import PropTypes from 'prop-types';

export function Link({
                       href,
                       children,
                       target,
                       rel,
                     }) {
  const attributes = {
    target,
    rel,
    href,
  };

  return <a {...attributes}>{children}</a>;
}
Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  target: PropTypes.string,
  rel: PropTypes.string,
};
