# NARAVA Access, Execution & Governance Baseline v1.0

- Status: **PROPOSED — awaiting review/merge; not yet canonical**
- Prepared: 2026-09-27
- Repository: `RidzBuilder/NARAVA.ID`
- Baseline branch at inspection: `main`
- Baseline commit: `40fb77a91858ab6267c6b1690aa8c3f3e02ef036` (PR #2 base SHA observed)
- Related remediation: [PR #2](https://github.com/RidzBuilder/NARAVA.ID/pull/2), branch `r2-ci-recovery`, head `ed1dd24744b20e5da83a51f46aa308840684ab2a`
- Authority: NARAVA DNA v1.0, Implementation Contract v1.0, Full-Stack Repository Specification v1.0, and repository instructions remain higher-order sources. This document governs execution mechanics only; it does not redefine business semantics.

## 1. Authority and change control

Canonical hierarchy remains:

Business Reality → NARAVA DNA v1.0 → Implementation Contract v1.0 → Repository Specification / instructions → Code → Tests and runtime evidence → UAT / release evidence.

No execution note, AI output, branch, CI result, or implementation convenience may silently modify DNA or contract semantics. A contradiction must be recorded as a GAP and escalated for an explicit owner decision before dependent implementation proceeds.

A framework/configuration being documented is not evidence that its implementation gate passes. Keep these separate:
1. **Decision status** — locked, proposed, or open.
2. **Implementation status** — not started, constructed, or operational.
3. **Evidence status** — absent, failed, partial, or passed for an exact commit/environment.
4. **Promotion authorization** — not granted unless explicitly recorded by the owner.
5. **Release/publish authorization** — separate, explicit owner decision.

## 2. GitHub access and repository handling

### Observed access (2026-09-27)
- Connected GitHub identity and repository permissions were previously and currently represented as `RidzBuilder`; repository API returned admin, maintain, push, pull, and triage permissions.
- Repository is public, not archived, default branch `main`.
- These observations establish connector access at inspection time only. They do not establish branch protection, ruleset enforcement, secrets access, external account access, or deployment access.
- A branch-protection API read returned HTTP 403 “Resource not accessible by integration”; therefore protection/ruleset status is **UNKNOWN / NOT VERIFIED**, not disabled and not enabled.

### Operating controls
- Treat `main` as the canonical integration branch, not a scratchpad.
- Work in isolated, purpose-specific branches. Keep governance documentation separate from application/runtime remediation.
- Do not commit directly to `main`, merge PRs, enable auto-merge, alter repository settings, change secrets, or deploy without the appropriate explicit owner authorization and passing gate evidence.
- Use the connected GitHub integration with least privilege. Do not request, paste, store, or commit personal access tokens, passwords, recovery codes, or production secrets in chat, prompts, issues, docs, or repository files.
- Verify MFA, branch rules/rulesets, required status checks, review requirements, and bypass actors through an authorized GitHub settings view. Current connector could not verify these settings.
- Any permission changes or production credentials are out of scope for R2 and must be justified by a later approved stage.

## 3. Execution environments and CI contract

### Authoritative R2 evidence channel
GitHub Actions for the exact PR head SHA is the current authoritative repeatable evidence channel. A green result on a different SHA, a local unrecorded run, a code review comment, or a generated report is not a substitute.

Workflow observed at `.github/workflows/ci.yml`:
- runner: `ubuntu-latest`
- Node configured: `22`
- commands: `npm --version`; repository contract validator; `npm install`; `npm run typecheck`; `npm run test`.

The workflow currently uses `npm install`, not `npm ci`. Whether a committed lockfile and reproducible clean-install contract are present must be verified before changing the workflow. Do not silently change package-management policy as part of governance documentation.

### Local execution
No authenticated, persistent local Node/npm workspace has been validated in this execution. Do not claim local typecheck/tests or use local results as a gate. GitHub Actions may be used for the current R2 recovery. A future local/Codespaces/devcontainer path must document Node/npm versions, clean checkout, install command, exact SHA, test commands, and captured output before it is accepted as reproducible evidence.

### Required CI evidence record
For every gate run, record:
- repository, workflow/run ID and URL;
- event and branch/PR;
- exact tested commit SHA;
- runner and Node/npm versions where logged;
- each required job/step conclusion;
- failure logs and remediation commit(s), if any;
- artifact links and capture date;
- reviewer/owner disposition.

A gate is PASS only if all required steps for the stated gate pass on the exact candidate SHA and evidence is inspectable. Failure or missing logs means FAIL or BLOCKED, not PASS.

## 4. Production and external dependencies

R2 Domain Foundation does not require production database, payment processor, supplier, logistics, object-storage, or deployment credentials. Do not introduce them to unblock R2.

For later stages, credentials must be provisioned through approved secret management, scoped to the minimum required environment and capability, rotated when exposed, and excluded from source control and evidence artifacts. Staging and production must be treated as distinct environments. No production deployment is authorized by this baseline.

## 5. Promotion and release rules

- R2 remains unpromoted until the repository-contract check, dependency installation, domain typecheck, and domain tests all pass on the same exact candidate SHA; review the logs and update the evidence register.
- R3 application work is dependent on R2 promotion. Until R2 passes, only R2 remediation and non-semantic governance/evidence work may proceed. Do not represent R3 as promoted or runtime-ready.
- R4–R15 remain subject to their stage-specific dependencies and evidence gates in the canonical roadmap/readiness artifacts.
- Runtime, E2E, reconciliation, UAT, security, staging, and production claims require evidence from the relevant actual environment. A contract, placeholder, mock, static document, or passing unit test alone cannot establish those gates.
- Publish/release requires a separate explicit owner authorization after required release gates pass.

## 6. Independent review

AI-assisted self-review is not independent external review. An external reviewer (human or a separately operated model) may provide supplementary review only when independence, input scope, version, prompts/instructions, findings, and disposition are documented. A second model's output does not by itself establish conformance, security, or release readiness. The owner retains the decision.

## 7. Current gate snapshot (2026-09-27)

| Item | Observed state | Governance disposition |
|---|---|---|
| Repository and connector access | Public repo; connector returned admin/push/pull access | Access available for repo operations; scope is connector-specific |
| Main protection/rulesets | API returned 403 to this integration | UNKNOWN; owner/settings verification required |
| PR #2 | Open, not merged; head `ed1dd24744b20e5da83a51f46aa308840684ab2a` | Keep isolated; do not merge until R2 evidence passes |
| PR #2 CI run 36259352075 | Repository contract PASS; install PASS; typecheck PASS; tests FAIL | R2 FAIL/BLOCKED |
| Test failure | Node `ERR_MODULE_NOT_FOUND` for `packages/domain/src/index.js` imported by `packages/domain/tests/invariants.test.ts`; Node 22.23.2 | Remediation required; see Execution Gate Register |
| Local Node/npm | Not validated | No local test claims |
| Production credentials | Not needed for R2; not inspected | Out of scope |
| R3 promotion | Not authorized | Blocked on R2 pass |
| Merge/deploy/publish | No authorization in this document | Separate explicit gate required |

## 8. Document control

This is a proposed governance artifact on an isolated branch. It becomes canonical only after owner review and explicit merge/lock decision. Changes require a versioned change record and must preserve the higher-order NARAVA authority hierarchy.
