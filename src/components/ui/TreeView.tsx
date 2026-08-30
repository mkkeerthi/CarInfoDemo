import { useState } from 'react';
import type { FeatureGroup, FeatureNode } from '../../types/car';

interface TreeNodeProps {
  node: FeatureNode;
  level: number;
}

function TreeNode({ node, level }: TreeNodeProps) {
  const [open, setOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <li id={`tree-node-${node.id}`} className="list-none" role="treeitem" aria-expanded={hasChildren ? open : undefined}>
      <div className="flex items-center gap-2 py-1" style={{ paddingLeft: level * 20 }}>
        {hasChildren ? (
          <button
            type="button"
            id={`tree-toggle-${node.id}`}
            onClick={() => setOpen((v) => !v)}
            className="text-neutral-400 hover:text-white"
            aria-label={`Toggle ${node.label}`}
          >
            <i className={`fa-solid fa-caret-${open ? 'down' : 'right'}`} aria-hidden="true" />
          </button>
        ) : (
          <span className="inline-block w-4 text-center text-neutral-600">&bull;</span>
        )}
        <span className="text-sm">{node.label}</span>
      </div>
      {hasChildren && open && (
        <ul role="group">
          {node.children!.map((child) => (
            <TreeNode key={child.id} node={child} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

interface TreeViewProps {
  id: string;
  groups: FeatureGroup[];
}

export default function TreeView({ id, groups }: TreeViewProps) {
  return (
    <div id={id} role="tree" aria-label="Car feature tree" className="space-y-4">
      {groups.map((group) => (
        <div key={group.id}>
          <p id={`tree-group-${group.id}`} className="mb-1 text-sm font-semibold text-emerald-400">
            {group.label}
          </p>
          <ul role="group">
            {group.features.map((node) => (
              <TreeNode key={node.id} node={node} level={0} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
