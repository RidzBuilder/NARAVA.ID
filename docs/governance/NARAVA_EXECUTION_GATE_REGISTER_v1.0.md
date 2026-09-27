# NARAVA Execution Gate Register v1.0

- Status: **LIVE EVIDENCE SNAPSHOT — 2026-09-27**
- Repository: `RidzBuilder/NARAVA.ID`
- Main SHA observed as PR #2 base: `40fb77a91858ab6267c6b1690aa8c3f3e02ef036`
- R2 recovery PR: [#2](https://github.com/RidzBuilder/NARAVA.ID/pull/2)
- PR #2 head SHA: `ed1dd24744b20e5da83a51f46aa308840684ab2a`
- This register is a proposed companion to the Access, Execution & Governance Baseline. It does not promote stages or authorize merging/deployment.

## 1. R2 CI recovery evidence

Workflow run inspected: [36259352075](https://github.com/RidzBuilder/NARAVA.ID/actions/runs/36259352075) (PR-triggered run for PR #2 head).

| Required step | Actual result | Evidence interpretation |
|---|---|---|
| Repository contract validator | PASS | Step completed successfully |
| npm install | PASS | Step completed successfully; workflow currently uses `npm install` |
| Domain typecheck | PASS | `tsc --noEmit` completed successfully |
| Domain tests | FAIL | Test process exited 1; no test passed |
| Overall run | FAILURE | R2 gate not satisfied |

### Failure detail
- Job: `validate`; job ID `108452067022`.
- Node runtime in test log: `v22.23.2`.
- Test file: `packages/domain/tests/invariants.test.ts`.
- Error: `ERR_MODULE_NOT_FOUND`; Node could not resolve `packages/domain/src/index.js` imported by the test file.
- The failure occurred after repository contract, install, and typecheck succeeded. Therefore this is not a clean R2 pass; the current blocking issue is executable test module resolution/runtime loading.
- A review bot's usage-limit comment is not a code review approval or technical finding and is excluded from evidence.

## 2. Immediate next action (mandatory sequence)

**GAP-NAR-001 — R2 executable test recovery (P0, OPEN / BLOCKING)**

1. Inspect `packages/domain/tests/invariants.test.ts`, package-level `package.json`, tsconfig, root scripts, and exact CI workflow at the PR head.
2. Determine the intended execution model for TypeScript tests under Node 22's `--experimental-strip-types`. Do not assume a source `.ts` import can resolve a nonexistent emitted `.js` file.
3. Choose the smallest contract-consistent fix: align test imports and runtime resolution, or adopt a documented build/test execution path. Avoid broad semantic/domain changes.
4. Implement only on an isolated R2 remediation branch or update the designated R2 recovery branch after inspecting its current head and confirming no concurrent work would be overwritten.
5. Push/commit the fix and capture a fresh GitHub Actions run on the exact resulting SHA.
6. Inspect the full job summary and test output. Require repository contract PASS, install PASS, typecheck PASS, and all domain tests PASS.
7. Re-run after any change. Record the final tested SHA and run URL here; do not copy forward a green result from another SHA.
8. Request/perform the designated review and owner gate decision. Only then may R2 be promoted. Until then, PR #2 remains unmerged and R3 remains blocked.

No fix or successful test is claimed by this register.

## 3. Stage gate register

| Gate / stage | Current evidence state | Promotion condition | Current disposition |
|---|---|---|---|
| R0 Repository Bootstrap | Existing readiness matrix says PASS | Preserve repository evidence | PASS as previously recorded; not re-audited here |
| R1 Governance & Source-of-Truth | Existing readiness matrix says PASS | Preserve canonical docs and change control | PASS as previously recorded; not re-audited here |
| R2 Domain Foundation | Contract/install/typecheck pass, tests fail on PR #2 SHA | All R2 CI steps pass on exact candidate SHA; review logs | FAIL/BLOCKED |
| R3 Application / Capability | Constructed; no gate pass evidence inspected here | R2 promotion + R3 executable application/capability tests | BLOCKED |
| R4 Contracts | Constructed; pending CI per readiness matrix | Required contract CI and conformance evidence | BLOCKED/PENDING |
| R5 Database | Constructed; runtime/migration proof pending | Real migration/runtime integration evidence | BLOCKED/PENDING |
| R6 API | Boundary constructed; runtime pending | Executable API runtime and contract tests | BLOCKED/PENDING |
| R7 Authorization | Constructed; enforcement evidence pending | Ownership/state/capability enforcement tests | BLOCKED/PENDING |
| R8 Web | Boundary constructed; runtime pending | Browser/UI runtime and QA evidence | BLOCKED/PENDING |
| R9 Mobile | Boundary constructed; runtime pending | Build/runtime/device evidence | BLOCKED/PENDING |
| R10 Test Architecture | Constructed; CI verification pending | Executable test infrastructure/conformance | BLOCKED/PENDING |
| R11 Infrastructure | Constructed; runtime pending | Reproducible environment/operations evidence | BLOCKED/PENDING |
| R12 Double-COD Golden Path | Contract constructed; E2E runtime pending | Actual end-to-end vertical slice and traceable artifacts | BLOCKED |
| R13 Reconciliation | Contract constructed; runtime pending | Cross-domain reconciliation execution and invariant evidence | BLOCKED |
| R14 UAT | Acceptance contract constructed; execution pending | Recorded UAT against agreed acceptance criteria | BLOCKED |
| R15 Evidence | Pending | Complete, traceable evidence bundle and gate review | BLOCKED |

Stage statuses above are based on the repository readiness matrix and evidence inspected in this snapshot; they are not a fresh full audit of each stage.

## 4. Cross-cutting GAP register

| GAP | Priority | Scope | Current status / exit evidence |
|---|---:|---|---|
| GAP-NAR-001 | P0 | R2 CI executable test recovery | OPEN; test module resolution failure; green exact-SHA CI required |
| GAP-NAR-002 | P0 | Executable application/API | OPEN; real runtime capability path and tests required |
| GAP-NAR-003 | P0 | Database runtime/migrations | OPEN; actual migration and runtime evidence required |
| GAP-NAR-004 | P0 | Double-COD vertical slice | OPEN; end-to-end execution, trace, and artifacts required |
| GAP-NAR-005 | P0 | Reconciliation engine | OPEN; executable cross-domain reconciliation evidence required |
| GAP-NAR-006 | P1 | Authorization enforcement | OPEN; identity/membership/role/tenant/resource/state/capability tests required |
| GAP-NAR-007 | P1 | Web UX/browser QA | OPEN; running app and browser test evidence required |
| GAP-NAR-008 | P1 | Team reproducibility/onboarding | OPEN; clean environment reproduction and onboarding evidence required |
| GAP-NAR-009 | P1 / release blocker | Staging/production operations | OPEN; environment, secrets, deployment, monitoring, rollback and security evidence required |
| GAP-NAR-010 | P1 | Independent release review | OPEN; independent scope/method/findings/disposition and owner review required |

The GAP descriptions and priorities are carried forward from the program's prior audit snapshot; they have not all been independently revalidated in this run.

## 5. Non-negotiable evidence and authorization rules

- Every PASS must identify the exact commit, environment, command/workflow, outcome, and inspectable evidence.
- Constructed, documented, mocked, or AI-generated output is not equivalent to runtime proof.
- Failed or inaccessible evidence is never silently treated as passed.
- A stage cannot be promoted across an unmet dependency.
- Merge, deployment, production changes, and publish remain separate explicit owner decisions.
- Any discovered contradiction against DNA v1.0 or Implementation Contract v1.0 is a blocking GAP pending owner decision.
- Keep evidence append-only or versioned; never erase failed run history when recording remediation.

## 6. Current decision

**Decision: R2 NOT PROMOTED. PR #2 NOT MERGED. R3–R15 remain subject to dependency gates.**

Next execution is GAP-NAR-001 remediation only, followed by exact-SHA CI rerun, log review, and a separately recorded R2 promotion decision.
