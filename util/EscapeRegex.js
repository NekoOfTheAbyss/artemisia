export default x => x.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');