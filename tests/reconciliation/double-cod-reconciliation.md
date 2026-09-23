# Double-COD Reconciliation Contract

A transaction is reconcilable only when order, settlement, inventory movement, fulfillment/handoffs, customer payment, realized margin, ledger, event and audit evidence can all be correlated to the same business transaction.

Required checks:
1. supplier settlement amount is independently recorded from customer payment.
2. supplier handoff corresponds to an inventory movement.
3. customer handoff precedes/anchors customer payment.
4. realized margin references actual customer payment and supplier settlement.
5. all critical transitions have actor/time evidence.
6. Completed Transaction requires all criteria and audit evidence.
