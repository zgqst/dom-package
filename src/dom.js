window.dom = {
  create(name) {
    //字符串 支持内容与否'div''<div>hi</div>'
    if (/^\s*<[\w\W]*>(\s)*$/g.test(name)) {
      let container = document.createElement("template");
      container.innerHTML = name.trim();
      return container.content.firstChild;
    } else {
      return document.createElement(name);
    }
  },
  append(parent, child) {
    parent.appendChild(child);
  },
  before(node1, node2) {
    //插入处，插入目标
    node1.parentNode.insertBefore(node2, node1);
  },
  after(node1, node2) {
    node1.parentNode.insertBefore(node1, node2.nextSibling);
  },
  remove(node) {
    //为了向下兼容，因此不用node.remove()
    node.parentNode.removeChild(node);
    return node;
  },
  wrap(node1, parent) {
    //目标元素，父元素
    dom.before(node1, parent);
    dom.append(parent, node1);
  },
  empty(node) {
    //清空node下的所有节点
    let temp = [];
    while (node.firstChild) {
      temp.push(node.firstChild);
      dom.remove(node.firstChild);
    }
    return temp;
  },
  attr(node, name, value) {
    //读写元素的属性
    if (arguments.length === 2) {
      //重载
      return node.getAttribute(name);
    } else if (arguments.length === 3) {
      node.setAttribute(name, value);
    }
  },
  text(node, string) {
    //读写元素的文本内容
    if (arguments.length === 1) {
      //适配老版本ie
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerText = string;
      } else {
        node.textContent = string;
      }
    }
  },
  html(node, string) {
    //读写元素的html内容
    if (arguments.length === 1) {
      return node.innerHTML;
    }
    if (arguments.length === 2) {
      node.innerHTML = string;
    }
  },
  style(node, name, value) {
    //读写原色css
    if (arguments.length === 3) {
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") return node.style[name];
      if (typeof name === "object") {
        for (key in name) {
          node.style[key] = name[key];
        }
      }
    }
  },
  class: {
    //修改classList
    add(node, name) {
      node.classList.add(name);
    },
    remove(node, name) {
      node.classList.remove(name);
    },
    has(node, name) {
      return node.classList.contains(name);
    },
  },
  on(node, event, fn) {
    node.addEventListener(event, fn);
  },
  off(node, event, fn) {
    node.removeEventListener(event, fn);
  },
  find(node, scope) {
    //获取标签
    let _node = (scope || document).querySelectorAll(node);
    if (_node.length === 1) {
      return _node[0];
    } else {
      return _node;
    }
  },
  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return node.children;
  },
  siblings(node) {
    return Array.prototype.slice
      .call(node.parentNode.children)
      .filter((e) => e !== node);
  },
  next(node) {
    let temp = node.nextSibling;
    while (temp && temp.nodeType === 3) {
      temp = temp.nextSibling;
    }
    return temp;
  },
  previous(node) {
    let temp = node.previousSibling;
    while (temp && temp.nodeType === 3) {
      temp = temp.previousSibling;
    }
    return temp;
  },
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
  index(node) {
    let list = this.children(dom.parent(node));
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) return i;
    }
  },
};
